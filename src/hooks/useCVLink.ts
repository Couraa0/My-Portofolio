import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCVSettings } from '@/lib/supabase';

// Default hardcoded links for fallback
const DEFAULT_LINKS = {
  cv_en: 'https://drive.google.com/file/d/11IWyd4FVIs1QjJGyMLBSaVOV83W-2fwe/view?usp=sharing',
  cv_id: 'https://drive.google.com/file/d/11IWyd4FVIs1QjJGyMLBSaVOV83W-2fwe/view?usp=sharing',
};

export function useCVLink() {
  const { i18n } = useTranslation();
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchLinks() {
      try {
        const data = await getCVSettings();
        if (!active) return;
        
        const mapped = { ...DEFAULT_LINKS };
        data.forEach((item) => {
          if (item.id === 'cv_en' && item.url) mapped.cv_en = item.url;
          if (item.id === 'cv_id' && item.url) mapped.cv_id = item.url;
        });
        
        setLinks(mapped);
      } catch (err) {
        // Table may not exist yet or connection error - silent fallback
        console.warn('Supabase getCVSettings failed, using default links:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchLinks();

    return () => {
      active = false;
    };
  }, []);

  const cvLink = i18n.language?.startsWith('id') ? links.cv_id : links.cv_en;

  return { cvLink, links, loading };
}

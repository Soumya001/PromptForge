import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: ReactNode;
  delay?: number;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  delay = 0,
}: SettingsSectionProps) {
  return (
    <motion.section
      custom={delay}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B5CF6]/10">
          <Icon className="w-4 h-4 text-[#8B5CF6]" />
        </div>
        <div>
          <h2 className="text-[16px] font-display font-semibold text-[#F0EEF5] tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-[13px] text-[#6D6A80] leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className="ml-11 mt-3">
        <div className="w-full h-px bg-[#252430] mb-5" />
        {children}
      </div>
    </motion.section>
  );
}

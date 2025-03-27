
import React from 'react';
import ServicesDevelopment from '../Dashboard/ServicesDevelopment';

interface PublishingSettingsProps {
  onTabChange: (tab: string) => void;
}

const PublishingSettings: React.FC<PublishingSettingsProps> = ({ onTabChange }) => {
  return <ServicesDevelopment onTabChange={onTabChange} />;
};

export default PublishingSettings;

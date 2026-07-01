import { getCompanyLogo } from "../../lib/company-logos";
import { CompanyLogo, type CompanyLogoSize } from "./CompanyLogo";

interface CompanyLogoFromNameProps {
  company: string;
  size?: CompanyLogoSize;
  className?: string;
  flat?: boolean;
}

export function CompanyLogoFromName({
  company,
  size = "md",
  className,
  flat = false,
}: CompanyLogoFromNameProps) {
  const logo = getCompanyLogo(company);

  return (
    <CompanyLogo
      src={logo?.src}
      alt={`${company} logo`}
      size={size}
      className={className}
      wordmark={logo?.wordmark}
      flat={flat}
    />
  );
}
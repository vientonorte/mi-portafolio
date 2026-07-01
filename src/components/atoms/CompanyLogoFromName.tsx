import { getCompanyLogo } from "../../lib/company-logos";
import { CompanyLogo, type CompanyLogoSize } from "./CompanyLogo";

interface CompanyLogoFromNameProps {
  company: string;
  size?: CompanyLogoSize;
  className?: string;
}

export function CompanyLogoFromName({
  company,
  size = "md",
  className,
}: CompanyLogoFromNameProps) {
  const logo = getCompanyLogo(company);

  return (
    <CompanyLogo
      src={logo?.src}
      alt={`${company} logo`}
      size={size}
      className={className}
      wordmark={logo?.wordmark}
    />
  );
}
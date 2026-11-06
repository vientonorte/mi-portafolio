import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { sitePrivacyHref } from '../../lib/site-nav';

interface ContactConsentFieldProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  consentText: string;
  privacyLinkLabel: string;
  error?: string;
}

export function ContactConsentField({
  id,
  checked,
  onCheckedChange,
  consentText,
  privacyLinkLabel,
  error,
}: ContactConsentFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          aria-invalid={!!error}
          aria-label={consentText}
          aria-describedby={error ? errorId : undefined}
        />
        <Label htmlFor={id} className="text-sm font-normal leading-snug cursor-pointer">
          {consentText}{' '}
          {/* Página real prerenderizada /privacidad/ (antes #/privacy abría el home). */}
          <a
            href={sitePrivacyHref()}
            className="text-primary underline underline-offset-2 hover:opacity-90"
            onClick={(e) => e.stopPropagation()}
            data-privacy-link
          >
            {privacyLinkLabel}
          </a>
        </Label>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
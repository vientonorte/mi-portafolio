import { Link } from 'react-router-dom';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ROUTES } from '../../lib/routes';

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
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          aria-invalid={!!error}
        />
        <Label htmlFor={id} className="text-sm font-normal leading-snug cursor-pointer">
          {consentText}{' '}
          <Link
            to={ROUTES.privacy}
            className="text-primary underline underline-offset-2 hover:opacity-90"
            onClick={(e) => e.stopPropagation()}
          >
            {privacyLinkLabel}
          </Link>
        </Label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
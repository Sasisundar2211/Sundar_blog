import { ArrowLeft, ArrowRight, ArrowUpRight, Info, WarningDiamond } from '@phosphor-icons/react/dist/ssr';

/** One icon family, one weight, sized to sit on the text baseline. */
const base = { size: '1em', weight: 'regular' as const, 'aria-hidden': true, className: 'inline-block shrink-0 align-[-0.125em]' };

export const ExternalIcon = () => <ArrowUpRight {...base} />;
export const ForwardIcon = () => <ArrowRight {...base} />;
export const BackIcon = () => <ArrowLeft {...base} />;
export const InfoIcon = () => <Info {...base} />;
export const WarnIcon = () => <WarningDiamond {...base} />;

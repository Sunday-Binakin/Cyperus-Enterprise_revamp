import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type ComponentPropsWithoutRef } from 'react';

interface TextLinkProps extends ComponentPropsWithoutRef<typeof Link> {
    className?: string;
}

export default function TextLink({
    className,
    children,
    ...props
}: TextLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                'rounded-sm font-medium underline-offset-4 outline-none transition-colors hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                className,
            )}
        >
            {children}
        </Link>
    );
}


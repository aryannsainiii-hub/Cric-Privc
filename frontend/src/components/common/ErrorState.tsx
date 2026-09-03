import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="flex min-h-[30vh] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-warn/20 bg-warn/[0.03] px-6 py-10 text-center">
    <AlertTriangle className="h-6 w-6 text-warn" />
    <p className="max-w-md text-sm text-slate-300">{message}</p>
    {onRetry && (
      <Button size="sm" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;

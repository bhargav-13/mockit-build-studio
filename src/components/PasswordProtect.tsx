import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

interface PasswordProtectProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const PASSWORD = 'aadi1234'; // Static password - in a real app, this should be handled more securely

export const PasswordProtect = ({ children, redirectPath = '/' }: PasswordProtectProps) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Protected Content</h2>
          <p className="mt-2 text-gray-600">Please enter the password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full py-6 px-4 text-lg"
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600">
              Unlock
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full py-6 text-lg"
              onClick={() => navigate(redirectPath)}
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

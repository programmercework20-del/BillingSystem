import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = [
    { username: 'cashier@restaurant.com', password: 'Cashier@2025', role: 'cashier', redirect: '/counter-billing-dashboard' },
    { username: 'manager@restaurant.com', password: 'Manager@2025', role: 'manager', redirect: '/counter-billing-dashboard' },
    { username: 'owner@restaurant.com', password: 'Owner@2025', role: 'owner', redirect: '/counter-billing-dashboard' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username or email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.username)) {
      newErrors.username = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const matchedUser = mockCredentials?.find(
        cred => cred?.username === formData?.username && cred?.password === formData?.password
      );

      if (matchedUser) {
        localStorage.setItem('userRole', matchedUser?.role);
        localStorage.setItem('username', formData?.username);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate(matchedUser?.redirect);
      } else {
        setErrors({
          submit: 'Invalid credentials. Please check your username and password and try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-elevation-3 overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-smooth">
                <Icon name="Store" size={40} color="var(--color-accent)" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-card-foreground text-center">
                RestaurantPOS Pro
              </h1>
              <p className="text-sm md:text-base text-muted-foreground text-center mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {errors?.submit && (
                <div className="bg-error/10 border border-error/20 rounded-md p-4 flex items-start gap-3">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error">{errors?.submit}</p>
                </div>
              )}

              <Input
                label="Username or Email"
                type="email"
                name="username"
                placeholder="Enter your email address"
                value={formData?.username}
                onChange={handleInputChange}
                error={errors?.username}
                required
                disabled={isLoading}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData?.password}
                  onChange={handleInputChange}
                  error={errors?.password}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth touch-target"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <Checkbox
                  label="Remember me"
                  checked={formData?.rememberMe}
                  onChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth touch-target"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                iconName="LogIn"
                iconPosition="right"
                className="mt-6"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 md:mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-success">
                  <Icon name="Shield" size={16} />
                  <span className="text-xs caption">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-success">
                  <Icon name="Lock" size={16} />
                  <span className="text-xs caption">PCI Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-success">
                  <Icon name="ShieldCheck" size={16} />
                  <span className="text-xs caption">Data Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-muted/30 rounded-md p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Demo Credentials</p>
              <div className="space-y-1 text-xs caption text-muted-foreground">
                <p><strong>Cashier:</strong> cashier@restaurant.com / Cashier@2025</p>
                <p><strong>Manager:</strong> manager@restaurant.com / Manager@2025</p>
                <p><strong>Owner:</strong> owner@restaurant.com / Owner@2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs caption text-muted-foreground">
            &copy; {new Date()?.getFullYear()} RestaurantPOS Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
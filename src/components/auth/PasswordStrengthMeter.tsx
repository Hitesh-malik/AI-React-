// src/components/auth/PasswordStrengthMeter.tsx

interface PasswordStrengthMeterProps {
    strength: number;
  }
  
  const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
    const getStrengthColor = () => {
      if (strength < 30) return 'bg-red-500';
      if (strength < 60) return 'bg-yellow-500';
      return 'bg-green-500';
    };
  
    const getStrengthText = () => {
      if (strength < 30) return 'Weak';
      if (strength < 60) return 'Moderate';
      return 'Strong';
    };
  
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor()}`}
              style={{ width: `${strength}%` }}
            ></div>
          </div>
          <span className="text-xs text-white ml-2">{getStrengthText()}</span>
        </div>
        <p className="text-xs text-white text-opacity-70">Use 8+ characters with a mix of letters, numbers & symbols</p>
      </div>
    );
  };
  
  export default PasswordStrengthMeter;
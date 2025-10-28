import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="flex justify-end space-x-6">
        <Link 
          to="/terms" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          利用規約
        </Link>
        <Link 
          to="/privacy" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
}

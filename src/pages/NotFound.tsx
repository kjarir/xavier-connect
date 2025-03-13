
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 rounded-full bg-xavier-50 flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-xavier-600">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          We couldn't find the page you're looking for. The URL <code className="bg-muted px-1 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist.
        </p>
        
        <div className="space-x-4">
          <Button asChild>
            <Link to="/" className="bg-xavier-600 hover:bg-xavier-700">
              Go to Homepage
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;

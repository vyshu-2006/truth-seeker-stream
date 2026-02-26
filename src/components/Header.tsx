import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, Shield } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface HeaderProps {
  session: Session;
  onSignOut: () => void;
}

const Header = ({ session, onSignOut }: HeaderProps) => {
  const initials = session.user.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 glass-panel px-4 sm:px-6 py-3">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className="text-xl font-display font-bold primary-gradient-text">
            Truth Seeker
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src={session.user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary font-display text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium truncate">{session.user.user_metadata?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

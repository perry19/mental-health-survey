import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  isLoggedIn = false,
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
}: HeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="w-full h-20 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="text-2xl font-bold text-primary">PsychSurvey</div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {t("nav.solutions")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="block p-3 hover:bg-gray-100 rounded-md">
                    <div className="font-medium">
                      {t("nav.employeeSurveys")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("nav.employeeSurveysDesc")}
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-3 hover:bg-gray-100 rounded-md">
                    <div className="font-medium">{t("nav.pulseSurveys")}</div>
                    <div className="text-sm text-gray-500">
                      {t("nav.pulseSurveysDesc")}
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {t("nav.resources")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="block p-3 hover:bg-gray-100 rounded-md">
                    <div className="font-medium">{t("nav.documentation")}</div>
                    <div className="text-sm text-gray-500">
                      {t("nav.documentationDesc")}
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-3 hover:bg-gray-100 rounded-md">
                    <div className="font-medium">{t("nav.bestPractices")}</div>
                    <div className="text-sm text-gray-500">
                      {t("nav.bestPracticesDesc")}
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{userName}</span>
          </div>
        ) : (
          <>
            <Button variant="ghost" onClick={() => navigate("/signin")}>
              {t("nav.signIn")}
            </Button>
            <Button onClick={() => navigate("/signup")}>
              {t("nav.getStarted")}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { FC, useEffect, useState } from "react";
import { StaySearchFormFields } from "../type";

import BuySearchForm from "../HeroSearchForm/real-estate-search-form/BuySearchForm";
import { useDispatch, useSelector } from "react-redux";
import { setSearchActiveTab } from "@/features/properties/propertiesSlice";
import RentSearchForm from "../HeroSearchForm/real-estate-search-form/RentSearchForm";

export type SearchTab =
  | "Rent"
  | "Buy";

export interface HeroSearchFormSmallProps {
  className?: string;
  defaultTab?: SearchTab;
  onTabChange?: (tab: SearchTab) => void;
  defaultFieldFocus?: StaySearchFormFields;
  setShowHeroSearch: React.Dispatch<
    React.SetStateAction<StaySearchFormFields | null | undefined>
  >;
}
const TABS: SearchTab[] = ["Buy", "Rent"];

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  defaultTab = "Buy",
  onTabChange,
  defaultFieldFocus,
  setShowHeroSearch,
}) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: any) => state.properties.searchActiveTab
  );
  const [tabActive, setTabActive] = useState<SearchTab>(defaultTab);

  useEffect(() => {
    setTabActive(defaultTab);
  }, [defaultTab]);

  const handleTabClick = (tab: SearchTab) => {
    setTabActive(tab);
    dispatch(setSearchActiveTab(tab));
    onTabChange && onTabChange(tab);
  };

  const renderTab = () => {
    return (
      <ul className="h-[88px] flex justify-center space-x-5 sm:space-x-9">
        {TABS.map((tab) => {
          const active = tab === activeTab;

          return (
            <li
              onClick={() => handleTabClick(tab)}
              className={`relative flex-shrink-0 flex items-center cursor-pointer text-base ${active
                ? "text-neutral-900 dark:text-neutral-200 font-medium"
                : "text-neutral-500 dark:text-neutral-300 "
                } 
                `}
              key={tab}
            >
              <div className="relative select-none">
                <span>{tab}</span>
                {active && (
                  <span className="absolute top-full mt-1 block w-full h-0.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    switch (activeTab) {
      case "Buy":
        return <BuySearchForm setShowHeroSearch={setShowHeroSearch} />;
      case "Rent":
        return <RentSearchForm setShowHeroSearch={setShowHeroSearch} />;
      case "Short Let":
        return (
          <div>
            <p className="text-secondary-6000 text-3xl">Coming Soon!!!</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchFormSmall ${className}`}
      data-nc-id="HeroSearchFormSmall"
    >
      {renderTab()}
      <div className="mt-2">{renderForm()}</div>
    </div>
  );
};

export default HeroSearchFormSmall;

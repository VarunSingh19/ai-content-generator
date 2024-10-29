'use client'
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";
import { motion } from "framer-motion";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleNavExpand = (expanded: boolean) => {
    setIsNavExpanded(expanded);
  };

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
        <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
          <div className="bg-slate-100 min-h-screen flex">
            <SideNav onExpand={handleNavExpand} />
            <motion.div
              className="flex-1 transition-all duration-300"
              animate={{ marginLeft: isNavExpanded ? "256px" : "64px" }}
            >
              <Header />
              {React.Children.map(children, child =>
                React.isValidElement(child) && 'isNavExpanded' in child.props
                  ? React.cloneElement(child, { isNavExpanded })
                  : child
              )}

            </motion.div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default Layout;
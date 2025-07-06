import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import GlobalNavigationSystem from "pages/global-navigation-system";
import WeeklyScheduleManagement from "pages/weekly-schedule-management";
import SalesAnalyticsDashboard from "pages/sales-analytics-dashboard";
import MembershipManagement from "pages/membership-management";
import TrainerSessionInterface from "pages/trainer-session-interface";
import ClientRetentionManagement from "pages/client-retention-management";
import ClientBookingInterface from "pages/client-booking-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<GlobalNavigationSystem />} />
        <Route path="/global-navigation-system" element={<GlobalNavigationSystem />} />
        <Route path="/weekly-schedule-management" element={<WeeklyScheduleManagement />} />
        <Route path="/sales-analytics-dashboard" element={<SalesAnalyticsDashboard />} />
        <Route path="/membership-management" element={<MembershipManagement />} />
        <Route path="/trainer-session-interface" element={<TrainerSessionInterface />} />
        <Route path="/client-retention-management" element={<ClientRetentionManagement />} />
        <Route path="/client-booking-interface" element={<ClientBookingInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
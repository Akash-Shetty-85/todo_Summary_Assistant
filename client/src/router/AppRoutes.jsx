// src/RoutesPage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Authentication } from "@/pages/Authentaction";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RoutesPage() {
    return (
        <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

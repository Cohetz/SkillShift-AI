import React from 'react';
export function Card({ children }: { children: React.ReactNode }) { return <div className="p-4 bg-white rounded shadow">{children}</div>; }
export function CardHeader({ children }: { children: React.ReactNode }) { return <div className="mb-2">{children}</div>; }
export function CardTitle({ children }: { children: React.ReactNode }) { return <h2 className="font-semibold text-lg">{children}</h2>; }
export function CardContent({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }

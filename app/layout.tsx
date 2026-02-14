import './globals.css';

export const metadata = {
  title: 'LaunchAI Sovereign',
  description: 'The War Room for 30-Day Revenue',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617' }}>
        {children}
      </body>
    </html>
  );
}

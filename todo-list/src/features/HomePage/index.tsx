import * as React from 'react';

export interface HomePageProps {
}

export default function HomePage(props: HomePageProps) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            {`Router to TodoList --> Services --> TodoList`}
        </div>
    );
}

import { useState, useEffect } from "react"

export const useUserBalance = (session, jobs) => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (!session) return;
        if (!session.user) return;
        fetch('/api/getUserBalance', {
            method: 'POST',
            body: JSON.stringify({ id: session.user._id })
        })
            .then(res => res.json())
            .then(data => setBalance(data.balance))
            .catch(console.error);
    }, [session, jobs]);

    return balance;
}
import { useEffect, useState, useContext } from 'react'
import { AlertContext } from '../context/AlertContext.jsx';

function Alert({ alertStatus, message }) {
    const { setAlert} = useContext(AlertContext);
    const [visible, setVisible] = useState(true);
    let d, color;
    if (alertStatus == 'success') {
        d = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
        color = "bg-green-500";
    }
    else if (alertStatus == 'warning') {
        d = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
        color = "bg-yellow-500";
    }
    else if (alertStatus == 'error') {
        d = "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
        color = "bg-red-500";
    }

    useEffect(() => {
        if(!alertStatus) return;

        setVisible(true);

        const timmer = setTimeout(() => {
            setAlert({ status: '', message: '' })
            setVisible(false);
        }, 4000)
        
        return () => clearTimeout(timmer);
    }, [alertStatus])

    if (!visible || !alertStatus) return null;

    return (
        <>
            {visible &&
                <div role="alert" className={`alert alert-${alertStatus} ${color} flex items-center absolute right-5 top-5 gap-3 p-3 rounded-xl`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
                    </svg>
                    <span>{message}</span>
                </div>
            }
        </>
    )
}

export default Alert
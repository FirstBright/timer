import { useState, useEffect } from "react"
interface ITimerButton {
    timerId: number // or string if needed
    label: string
}

const TimerButton = ({ timerId, label }: ITimerButton) => {
    const [timeRemaining, setTimeRemaining] = useState(0) // Time remaining in seconds
    const [isRunning, setIsRunning] = useState(false) // Track if the timer is running

    // Load timer state from localStorage when the component mounts
    useEffect(() => {
        const storedTimerData = localStorage.getItem(`timer_${timerId}`)
        if (storedTimerData) {
            const { remainingTime, startTime } = JSON.parse(storedTimerData)
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000)

            if (timeElapsed < remainingTime) {
                // Calculate remaining time if timer was interrupted
                setTimeRemaining(remainingTime - timeElapsed)
                setIsRunning(true) // Continue the timer if still running
            }
        }
    }, [timerId])

    // Handle the countdown logic
    useEffect(() => {
        let intervalId: any

        if (isRunning && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0)) // Decrement time by 1 second
            }, 1000)
        }

        // Stop the timer when time runs out
        if (timeRemaining === 0 && isRunning) {
            setIsRunning(false)
        }

        return () => clearInterval(intervalId)
    }, [isRunning, timeRemaining])

    // Save timer state in localStorage every second while running
    useEffect(() => {
        if (isRunning) {
            localStorage.setItem(
                `timer_${timerId}`,
                JSON.stringify({
                    remainingTime: timeRemaining,
                    startTime: Date.now(),
                })
            )
        } else {
            localStorage.removeItem(`timer_${timerId}`) // Clear localStorage when timer stops
        }
    }, [isRunning, timeRemaining, timerId])
    const handleClick = () => {
        if (!isRunning) {
            // Start the 1-hour countdown if not running
            setTimeRemaining(3600) // 1 hour in seconds
            setIsRunning(true) // Set the timer to running state
        }
    }

    return (
        <button
            onClick={handleClick} // Start countdown when button is clicked
            style={{
                backgroundColor: isRunning ? "red" : "white", // Red if running, white if not
                color: isRunning ? "white" : "black",
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
                width: "100%", // Make sure button is full width
                marginBottom: "10px", // Add space between buttons
            }}
        >
            {label} {"   "}
            {isRunning
                ? `${Math.floor((timeRemaining % 3600) / 60)}분 ${
                      timeRemaining % 60
                  }초`
                : ""}
        </button>
    )
}

export default TimerButton

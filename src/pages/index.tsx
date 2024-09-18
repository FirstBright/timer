// pages/index.js
import TimerButton from "@/components/timerButton"

export default function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center buttons horizontally
                justifyContent: "center",
                height: "100vh", // Take up full screen height
                padding: "20px", // Add padding for mobile
            }}
        >
            <h1 className='center mb-6'>협동 타이머</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column", // Stack buttons vertically
                    width: "100%", // Ensure buttons take up the full width on mobile
                    maxWidth: "400px", // Max width for larger screens
                }}
            >
                <TimerButton timerId={1} label='케이론' />
                <TimerButton timerId={2} label='타락한 낙원' />
                <TimerButton timerId={3} label='다크사이트' />
                <TimerButton timerId={4} label='지옥으로 통하는길' />
                <TimerButton timerId={5} label='디스코' />
            </div>
        </div>
    )
}

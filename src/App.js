import GoalTracking from "./pages/GoalTracking/GoalTracking";
import TaskManagment from "./pages/TaskManagement/TaskManagment";

import DailyPlanning from "./pages/DailyPlanning/DailyPlanning";

function App() {
    return (
        <div className="App">
            <DailyPlanning />

            {/* <GoalTracking /> */}
            <TaskManagment />
        </div>
    );
}

export default App;

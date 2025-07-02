import { format } from "date-fns"
import { WeightChart } from "../weight/weight_chart";
import { Button } from "../ui/button";

const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

export const MainOverview = () => {

    return(
        <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-6xl font-bold text-center mb-4 mt-16">Moin Jonathan!</h1>
                <p className="text-muted-foreground text-2xl text-center">{days[new Date().getDay()]}, {format(new Date(), "dd.MM.yy")}</p>

                <Button variant={"ghost"} onClick={() => window.location.reload()} className="mt-8 mx-auto">
                    Reload Page
                </Button>
            </div>

            <div>
                <WeightChart/>
            </div>
        </div>
    )
}
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme()
    const getTheme = localStorage.getItem('theme')

    return (
        <Switch
            defaultSelected
            size="lg"
            color="default"
            thumbIcon={({ className }) =>
                getTheme === 'light' ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
            checked={theme === getTheme}
            onChange={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}
        >
        </Switch>
    );
}

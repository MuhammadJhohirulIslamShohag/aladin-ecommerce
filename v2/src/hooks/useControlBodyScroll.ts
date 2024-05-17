import { useEffect } from "react";

const useControlBodyScroll = (isScroll:boolean ) => {
    // Function to control body scroll
    const toggleBodyScroll = (shouldDisableScroll: boolean) => {
        if (shouldDisableScroll) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    useEffect(() => {
        // When the modal is opened, disable body scroll
        if (isScroll) {
            toggleBodyScroll(true);
        } else {
            toggleBodyScroll(false);
        }

        // Cleanup on unmount
        return () => {
            toggleBodyScroll(false);
        };
    }, [isScroll]);
};

export default useControlBodyScroll;

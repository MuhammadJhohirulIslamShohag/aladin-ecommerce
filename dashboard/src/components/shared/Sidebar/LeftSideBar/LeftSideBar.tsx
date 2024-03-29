import Style from "../../../../assets/styles/scrollbar.module.css";

const LeftSideBar = () => {
    return (
        <div
            className={`h-[calc(100vh-40px)] overflow-y-scroll scrollbar-thumb-success scrollbar-track-sky-300 scrollbar-thin mt-28 ${Style.scrollbar}`}
        >
            <div>
                <ul className="mb-6 flex flex-col">

                </ul>
            </div>
        </div>
    );
};

export default LeftSideBar;

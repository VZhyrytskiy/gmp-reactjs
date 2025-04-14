export interface SortControlProps {
    currentSelection: string;
    onSelectionChange: (newValue: string) => void;
}

export function SortControl(props: SortControlProps) {
    const { currentSelection, onSelectionChange } = props;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        onSelectionChange(newValue);
    };

    return (
        <div className="flex items-center bg-gray space-x-4 min-w-[500px]">
            {/* Label "Sort by" */}
            <label className="text-base text-white opacity-70">Sort by</label>

            {/* SELECT */}
            <select
                defaultValue={currentSelection}
                onChange={handleChange}
                className="select select-sm select-bordered bg-gray text-white max-w-[200px]">

                <option value="release_date" className="uppercase">RELEASE DATE</option>
                <option value="title" className="uppercase">TITLE</option>
            </select>
        </div>
    );
};

import { useState } from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const [searchTerm, setSearchTerm] = useState("");

	function handleSearch(input) {
	setSearchTerm(input.toLowerCase()); 
	}
	return (
		<div className='w-1/4 min-w-[250px] max-w-[300px] border-r border-slate-500 p-4 flex flex-col h-full'>
			<SearchInput onSearch={handleSearch} />
			<div className='divider px-3'></div>
			<Conversations searchTerm={searchTerm} />
			
		</div>
	);
};
export default Sidebar;

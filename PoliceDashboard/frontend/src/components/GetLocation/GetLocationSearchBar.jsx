

// import React, { useState } from 'react';

// const GetLocationSearchBar = ({ onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filter, setFilter] = useState('');

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const handleSearch = () => {
//         onSearch(searchTerm, filter);
//     };

//     return (
//         <div style={styles.container}>

//             <select value={filter} onChange={handleFilterChange} style={styles.dropdown}>
//                 <option value="">Select Time Filter</option>
//                 <option value="after-12pm">After 12 PM</option>
//                 <option value="after-9pm">After 9 PM</option>
//                 <option value="not-registered-today">Not Registered Today</option>
//             </select>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 style={styles.searchInput}
//             />
//             <button onClick={handleSearch} style={styles.button}>
//                 Search
//             </button>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//     },
//     searchInput: {
//         padding: '8px',
//         fontSize: '16px',
//         borderRadius: '4px',
//         border: '1px solid #ccc',
//         width: '200px',
//     },
//     dropdown: {
//         padding: '8px',
//         fontSize: '16px',
//         borderRadius: '4px',
//         border: '1px solid #ccc',
//     },
//     button: {
//         padding: '8px 12px',
//         fontSize: '16px',
//         borderRadius: '4px',
//         border: 'none',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         cursor: 'pointer',
//     },
// };

// export default GetLocationSearchBar;




import React, { useState } from 'react';

const GetLocationSearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm, filter);
    };

    return (
        <div style={styles.container}>
            <select value={filter} onChange={handleFilterChange} style={styles.dropdown}>
                <option value="">Select Time Filter</option>
                <option value="after-12pm">After 12 PM</option>
                <option value="after-9pm">After 9 PM</option>
                <option value="not-registered-today">Not Registered Today</option>
            </select>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={styles.searchInput}
            />
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    searchInput: {
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
    },
    dropdown: {
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default GetLocationSearchBar;

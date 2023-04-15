import React, {useState} from 'react';
import './App.scss';

function App() {
    const [sortedList, setSortedList] = useState<number[]>([]);
    const [searchedNumber, setSearchedNumber] = useState<number>(0);
    const [searchedIndex, setSearchedIndex] = useState<number | null>(null);
    const [highlightedIndexes, setHighlightedIndexes] = useState<number[]>([]);
    const [highlightedMiddleIndexes, setHighlightedMiddleIndexes] = useState<number[]>([]);
    const [currentRange, setCurrentRange] = useState<{ start: number, end: number } | null>(null);
    const [arrayLength, setArrayLength] = useState<number>(0);

    const generateSortedList = (size: number) => {
        if (!size) {
            size = 71
        }
        const set = new Set<number>();
        while (set.size < size) {
            set.add(Math.floor(Math.random() * 100));
        }
        const list = Array.from(set).sort((a, b) => a - b);
        setSortedList(list);
        setSearchedIndex(null);
        setHighlightedIndexes([]);
        setCurrentRange(null);
    };

    const binarySearch = async () => {
        setSearchedIndex(null);
        setHighlightedIndexes([]);
        setCurrentRange({start: 0, end: sortedList.length - 1});

        let low = 0;
        let high = sortedList.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            setHighlightedIndexes([low, high]);
            setHighlightedMiddleIndexes([mid]);
            setCurrentRange({start: low, end: high});

            await new Promise((r) => setTimeout(r, 1000));

            if (sortedList[mid] === searchedNumber) {
                setSearchedIndex(mid);
                setHighlightedIndexes([]);
                setCurrentRange(null);
                break;
            } else if (sortedList[mid] < searchedNumber) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (low > high) {
            setSearchedIndex(null);
            setHighlightedIndexes([]);
            setHighlightedMiddleIndexes([]);
            setCurrentRange(null);
        }
    };

    const linearSearch = async () => {
        setSearchedIndex(null);
        setHighlightedIndexes([]);
        setCurrentRange({start: 0, end: sortedList.length - 1});

        for (let i = 0; i < sortedList.length; i++) {
            setHighlightedIndexes([i]);
            setCurrentRange({start: 0, end: sortedList.length - 1});

            await new Promise((r) => setTimeout(r, 50));

            if (sortedList[i] === searchedNumber) {
                setSearchedIndex(i);
                setHighlightedIndexes([]);
                setCurrentRange(null);
                break;
            }
        }

        if (searchedIndex === null) {
            setHighlightedIndexes([]);
            setCurrentRange(null);
        }
    };

    const handleReset = () => {
        setSearchedIndex(null);
        setHighlightedMiddleIndexes([]);
    }

    return (
        <div className="app">
            {sortedList.length > 0 && (
                <div className="block-list">
                    {sortedList.map((num, index) => (
                        <div
                            className={
                                "block-number " +
                                (highlightedIndexes[0] <= index &&
                                index <= highlightedIndexes[1]
                                    ? "isPart "
                                    : "") +
                                (searchedIndex === index ? "isResult " : "") +
                                (highlightedIndexes.includes(index) ? "isBord " : "") +
                                (highlightedMiddleIndexes.includes(index)
                                    ? "isMiddle "
                                    : "")
                            }
                            key={index}
                        >
                            <p>{num}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="actions">
                <div className='input-block'>
                    <label>
                        Choose the size of the list:
                        <input
                            value={arrayLength}
                            type="number"
                            onChange={(e) => {
                                generateSortedList(Number(e.target.value));
                                setArrayLength(Number(e.target.value));
                            }}
                        />
                    </label>
                    <br/>
                    <label>
                        Enter the number to search for:
                        <input
                            type="number"
                            value={searchedNumber}
                            onChange={(e) => setSearchedNumber(Number(e.target.value))}
                        />
                    </label>
                </div>
                <div className='button-block'>
                    <button className='search' onClick={() => linearSearch()}>Linear Search</button>

                    <button className='search' onClick={() => binarySearch()}>Binary Search</button>

                    <button className='search' onClick={() => handleReset()}>Reset</button>
                </div>
            </div>

            {searchedIndex !== null && (
                <div className="result">
                    <p className='textResult hasResult'>{`The number ${searchedNumber} was found at index ${searchedIndex}`}</p>
                </div>
            )}

            {currentRange !== null && (
                <div className="range">
                    <p className='textResult'>{`Searching from index ${currentRange.start} to ${currentRange.end}`}</p>
                </div>
            )}
        </div>
    );
}

export default App;

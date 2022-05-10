import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <a href="/">
                    <svg
                        id="logo-4"
                        width="100"
                        height="51"
                        viewBox="0 0 100 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {' '}
                        <path
                            d="M2.58517 29.5165H5.41809V43.4072H2.58517V29.5165Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M7.06117 38.6479C7.0593 37.6502 7.35345 36.6743 7.9064 35.8438C8.45935 35.0133 9.24624 34.3655 10.1675 33.9824C11.0887 33.5993 12.1029 33.4981 13.0817 33.6916C14.0605 33.8851 14.9599 34.3646 15.666 35.0695C16.3722 35.7743 16.8534 36.6728 17.0487 37.6512C17.2441 38.6296 17.1448 39.644 16.7634 40.566C16.382 41.4879 15.7357 42.276 14.9062 42.8305C14.0768 43.3851 13.1015 43.681 12.1038 43.681C11.4402 43.6886 10.7819 43.5637 10.1673 43.3135C9.55272 43.0634 8.99423 42.6931 8.52459 42.2243C8.05495 41.7556 7.6836 41.1978 7.43231 40.5836C7.18102 39.9695 7.05484 39.3114 7.06117 38.6479ZM14.2945 38.6479C14.2834 38.2172 14.1455 37.7993 13.8981 37.4466C13.6507 37.0938 13.3048 36.8219 12.9036 36.6647C12.5024 36.5075 12.0638 36.4722 11.6427 36.563C11.2215 36.6538 10.8365 36.8668 10.5357 37.1753C10.235 37.4838 10.0319 37.8742 9.95184 38.2976C9.87179 38.7209 9.91837 39.1585 10.0857 39.5555C10.2531 39.9525 10.5338 40.2914 10.8927 40.5297C11.2517 40.768 11.6729 40.8952 12.1038 40.8953C12.3985 40.9036 12.6918 40.8507 12.9651 40.7399C13.2384 40.6291 13.4858 40.4629 13.6917 40.2517C13.8975 40.0405 14.0574 39.789 14.1611 39.513C14.2649 39.2369 14.3103 38.9424 14.2945 38.6479Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M28.5346 33.8886V42.935C28.5346 46.1362 26.0322 47.4866 23.5015 47.4866C22.6116 47.5528 21.7206 47.3728 20.9261 46.9664C20.1316 46.56 19.4643 45.9428 18.9972 45.1825L21.4335 43.7755C21.6268 44.1651 21.9327 44.4878 22.3115 44.7016C22.6903 44.9154 23.1246 45.0106 23.5582 44.9747C23.8434 45.0223 24.1358 45.0037 24.4128 44.9203C24.6898 44.837 24.9439 44.6912 25.1556 44.4941C25.3672 44.297 25.5308 44.0539 25.6337 43.7836C25.7366 43.5133 25.776 43.223 25.7489 42.935V42.0568C25.4159 42.4666 24.9909 42.7921 24.5086 43.007C24.0263 43.2219 23.5001 43.3202 22.9727 43.2939C21.6904 43.2939 20.4607 42.7845 19.5539 41.8778C18.6472 40.9711 18.1378 39.7413 18.1378 38.459C18.1378 37.1767 18.6472 35.947 19.5539 35.0403C20.4607 34.1336 21.6904 33.6242 22.9727 33.6242C23.4998 33.6001 24.0252 33.6994 24.5072 33.9141C24.9892 34.1289 25.4144 34.4532 25.7489 34.8612V33.9169L28.5346 33.8886ZM25.7489 38.459C25.7678 37.9998 25.6488 37.5454 25.4074 37.1542C25.1659 36.7631 24.813 36.4531 24.394 36.2642C23.975 36.0752 23.509 36.0159 23.056 36.0939C22.603 36.1718 22.1837 36.3835 21.852 36.7016C21.5202 37.0198 21.2912 37.4299 21.1944 37.8792C21.0975 38.3285 21.1373 38.7966 21.3086 39.2231C21.4799 39.6497 21.7748 40.0152 22.1555 40.2728C22.5362 40.5305 22.9852 40.6683 23.4448 40.6687C23.7449 40.6899 24.046 40.6481 24.3288 40.5458C24.6117 40.4435 24.87 40.2832 25.0871 40.075C25.3041 39.8668 25.4752 39.6154 25.5892 39.3371C25.7032 39.0588 25.7576 38.7597 25.7489 38.459Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M30.1683 38.6479C30.1664 37.6502 30.4606 36.6743 31.0135 35.8438C31.5665 35.0133 32.3534 34.3655 33.2746 33.9824C34.1958 33.5993 35.21 33.4981 36.1888 33.6916C37.1676 33.8851 38.067 34.3646 38.7732 35.0695C39.4793 35.7743 39.9605 36.6728 40.1559 37.6512C40.3512 38.6296 40.2519 39.644 39.8705 40.566C39.4891 41.4879 38.8428 42.276 38.0134 42.8305C37.1839 43.3851 36.2086 43.681 35.2109 43.681C34.5474 43.6886 33.889 43.5637 33.2744 43.3135C32.6598 43.0634 32.1013 42.6931 31.6317 42.2243C31.1621 41.7556 30.7907 41.1978 30.5394 40.5836C30.2881 39.9695 30.1619 39.3114 30.1683 38.6479ZM37.4017 38.6479C37.3905 38.2172 37.2526 37.7993 37.0052 37.4466C36.7578 37.0938 36.4119 36.8219 36.0107 36.6647C35.6096 36.5075 35.171 36.4722 34.7498 36.563C34.3286 36.6538 33.9436 36.8668 33.6428 37.1753C33.3421 37.4838 33.139 37.8742 33.0589 38.2976C32.9789 38.7209 33.0255 39.1585 33.1928 39.5555C33.3602 39.9525 33.6409 40.2914 33.9998 40.5297C34.3588 40.768 34.78 40.8952 35.2109 40.8953C35.5041 40.9009 35.7953 40.8461 36.0664 40.7341C36.3374 40.6221 36.5825 40.4555 36.7863 40.2446C36.9901 40.0338 37.1482 39.7831 37.2509 39.5084C37.3535 39.2337 37.3984 38.9407 37.3828 38.6479H37.4017Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M41.5661 31.339C41.5661 30.9991 41.6669 30.6668 41.8557 30.3842C42.0446 30.1016 42.313 29.8813 42.627 29.7512C42.9411 29.6211 43.2866 29.5871 43.62 29.6534C43.9534 29.7197 44.2596 29.8834 44.5 30.1237C44.7404 30.3641 44.904 30.6703 44.9703 31.0037C45.0367 31.3371 45.0026 31.6827 44.8726 31.9967C44.7425 32.3107 44.5222 32.5792 44.2396 32.768C43.9569 32.9568 43.6247 33.0576 43.2847 33.0576C42.8297 33.0552 42.394 32.8733 42.0722 32.5515C41.7504 32.2298 41.5686 31.7941 41.5661 31.339ZM41.8588 33.8886H44.6917V43.4072H41.8588V33.8886Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M57.0431 38.6479C57.0774 39.2771 56.987 39.9069 56.777 40.501C56.5669 41.0951 56.2415 41.6418 55.8193 42.1096C55.3971 42.5774 54.8866 42.9571 54.3171 43.2268C53.7476 43.4965 53.1304 43.6509 52.501 43.6811C51.9726 43.7064 51.445 43.6156 50.9556 43.4149C50.4661 43.2142 50.0266 42.9086 49.6681 42.5196V47.2411H46.8352V33.8886H49.6681V34.7857C50.0266 34.3967 50.4661 34.0911 50.9556 33.8904C51.445 33.6897 51.9726 33.5989 52.501 33.6242C53.1296 33.6544 53.746 33.8085 54.3148 34.0776C54.8837 34.3468 55.3938 34.7256 55.8158 35.1924C56.2379 35.6592 56.5635 36.2047 56.7741 36.7977C56.9848 37.3907 57.0762 38.0195 57.0431 38.6479ZM54.2102 38.6479C54.199 38.2047 54.058 37.7745 53.8047 37.4106C53.5514 37.0468 53.197 36.7651 52.7853 36.6007C52.3736 36.4362 51.9226 36.3961 51.4884 36.4854C51.0541 36.5746 50.6555 36.7893 50.342 37.1028C50.0285 37.4163 49.8139 37.8148 49.7246 38.2491C49.6354 38.6834 49.6755 39.1343 49.8399 39.546C50.0044 39.9577 50.286 40.3122 50.6499 40.5654C51.0138 40.8187 51.444 40.9597 51.8872 40.9709C52.1965 40.9906 52.5064 40.9438 52.7962 40.8338C53.0859 40.7237 53.3487 40.5529 53.567 40.3329C53.7852 40.1128 53.9539 39.8486 54.0616 39.558C54.1692 39.2674 54.2135 38.9571 54.1913 38.6479H54.2102Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M65.863 40.5554C65.863 42.7462 63.9744 43.681 61.8969 43.681C61.067 43.7545 60.2341 43.5779 59.5054 43.174C58.7768 42.7701 58.1856 42.1574 57.8081 41.4147L60.2822 40.0077C60.3826 40.3512 60.5976 40.65 60.8913 40.8544C61.1851 41.0588 61.5399 41.1566 61.8969 41.1314C62.5863 41.1314 62.9262 40.9142 62.9262 40.5365C62.9262 39.4883 58.2047 40.0455 58.2047 36.7593C58.2047 34.6818 59.9611 33.6336 61.9819 33.6336C62.7276 33.611 63.4658 33.7881 64.12 34.1468C64.7742 34.5054 65.3205 35.0325 65.7025 35.6733L63.219 36.9765C63.1093 36.7271 62.9295 36.5149 62.7015 36.3657C62.4735 36.2165 62.2072 36.1367 61.9347 36.136C61.4437 36.136 61.1415 36.3249 61.1415 36.6743C61.1793 37.7602 65.863 37.0331 65.863 40.5554Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M76.2881 33.8886V43.4072H73.4551V42.5196C73.1256 42.914 72.7074 43.2248 72.2347 43.4267C71.7621 43.6286 71.2483 43.7157 70.7355 43.6811C68.8469 43.6811 67.1755 42.3118 67.1755 39.7339V33.8886H70.0084V39.3184C69.9835 39.5498 70.0105 39.7838 70.0873 40.0035C70.1641 40.2232 70.2888 40.423 70.4525 40.5885C70.6161 40.754 70.8146 40.8809 71.0334 40.9601C71.2522 41.0394 71.486 41.0688 71.7176 41.0465C72.7564 41.0465 73.4835 40.4421 73.4835 39.0918V33.8886H76.2881Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M92.6623 37.5713V43.4071H89.8293V37.8169C89.8293 36.8726 89.3666 36.2493 88.4601 36.2493C87.5536 36.2493 86.9681 36.9198 86.9681 38.0435V43.4071H84.1352V37.8169C84.1352 36.8726 83.6819 36.2493 82.7659 36.2493C81.85 36.2493 81.2834 36.9198 81.2834 38.0435V43.4071H78.4505V33.8886H81.2834V34.7668C81.5795 34.3789 81.9678 34.0712 82.4131 33.8717C82.8584 33.6721 83.3465 33.587 83.833 33.6242C84.3216 33.6004 84.8081 33.7037 85.2449 33.9237C85.6818 34.1438 86.0542 34.4733 86.326 34.8801C86.642 34.4548 87.0607 34.1165 87.5429 33.8969C88.0251 33.6773 88.5551 33.5834 89.0833 33.6242C91.2364 33.6242 92.6623 35.1917 92.6623 37.5713Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M95.0798 33.832C96.248 33.832 97.195 32.8849 97.195 31.7167C97.195 30.5485 96.248 29.6015 95.0798 29.6015C93.9116 29.6015 92.9645 30.5485 92.9645 31.7167C92.9645 32.8849 93.9116 33.832 95.0798 33.832Z"
                            className="cneutral"
                            fill="#2c060e"
                            stopColor="#2c060e"
                        ></path>{' '}
                        <path
                            d="M34.6443 22.3115C40.1151 22.3115 44.55 17.8765 44.55 12.4057C44.55 6.93493 40.1151 2.49997 34.6443 2.49997C29.1735 2.49997 24.7385 6.93493 24.7385 12.4057C24.7385 17.8765 29.1735 22.3115 34.6443 22.3115Z"
                            className="ccompli1"
                            fill="#a51535"
                            stopColor="#a51535"
                        ></path>{' '}
                        <path
                            d="M56.7882 22.3115C62.259 22.3115 66.6939 17.8765 66.6939 12.4057C66.6939 6.93493 62.259 2.49997 56.7882 2.49997C51.3174 2.49997 46.8824 6.93493 46.8824 12.4057C46.8824 17.8765 51.3174 22.3115 56.7882 22.3115Z"
                            className="ccompli2"
                            fill="#680e21"
                            stopColor="#680e21"
                        ></path>{' '}
                        <path
                            d="M22.4061 2.49997H2.60406V22.302H22.4061V2.49997Z"
                            className="ccustom"
                            fill="#e11d48"
                            stopColor="#e11d48"
                        ></path>{' '}
                    </svg>
                </a>
                <nav className="flex items-center space-x-1 text-sm font-medium text-gray-800">
                    <Link to="admin" className="rounded bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-700">
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export { Header };

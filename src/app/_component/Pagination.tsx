// 페이지네이션 컴포넌트
type props = {
    currentPage: number;
    totalPages: number;
    maxPageButtons: number;
    onPageChange: (page: number) => void;
};

//todo 작동원리 파악하기
export default function Pagination({
    currentPage,
    totalPages,
    maxPageButtons,
    onPageChange,
}: props) {
    // 페이지 번호 영역 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endOffset = startPage + maxPageButtons - 1;

    // 끝 페이지 번호가 총 페이지 수를 초과하는 경우 조정
    if (endOffset > totalPages) {
        startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }

    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // 페이지 번호 버튼 생성
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                disabled={i === currentPage}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                    i === currentPage
                        ? 'bg-blue-500 text-white cursor-default'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                {i}
            </button>,
        );
    }

    // 페이지 버튼이 maxPageButtons개가 안 되는 경우 빈 자리를 채움
    while (pageButtons.length < maxPageButtons) {
        pageButtons.push(
            <span
                key={`empty-${pageButtons.length}`}
                className="w-8 h-8"
            ></span>,
        );
    }

    return (
        <div className="w-full flex justify-center items-center mt-4 gap-2">
            {/* 처음 버튼 */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-default'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                처음
            </button>

            {/* 이전 버튼 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-default'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                이전
            </button>

            {/* 페이지 번호 버튼 */}
            {pageButtons}

            {/* 다음 버튼 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-default'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                다음
            </button>

            {/* 마지막 버튼 */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-default'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                마지막
            </button>
        </div>
    );
}

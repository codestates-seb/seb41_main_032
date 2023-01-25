package mainproject.stocksite.domain.board.service;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.board.repository.BoardRepository;
import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    private final MemberService memberService;

    public Board addBoard(Board board) {
        memberService.verifyExistsMember(board.getMember().getMemberId());

        return boardRepository.save(board);
    }

    public Board updateBoard(Board board) {
        verifyExistsBoard(board.getBoardId());

        Optional<Board> boardOptional = boardRepository.findById(board.getBoardId());
        if (boardOptional.isPresent()) {
            Board board1 = boardOptional.get();
            board1.setTitle(board.getTitle());
            board1.setContent(board.getContent());
            return boardRepository.save(board1);
        }
        return boardRepository.save(board);
    }

    @Transactional(readOnly = true)
    public Board getBoard(long boardId) {
        verifyExistsBoard(boardId);

        Board findBoard = boardRepository.findById(boardId).get();
        return findBoard;
    }

    @Transactional(readOnly = true)
    public List<Board> getBoardList() {
        return boardRepository.findAll();
    }

    public void deleteBoard(long boardId) {
        verifyExistsBoard(boardId);

        boardRepository.deleteById(boardId);
    }

    public void verifyExistsBoard(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        optionalBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }
}

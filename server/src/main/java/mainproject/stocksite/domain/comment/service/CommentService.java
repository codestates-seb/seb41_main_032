package mainproject.stocksite.domain.comment.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.board.service.BoardService;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.comment.repository.CommentRepository;
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
public class CommentService {

    private final CommentRepository commentRepository;

    private final BoardService boardService;

    private final MemberService memberService;

    public Comment createComment(Comment comment) {
        memberService.verifyExistsMember(comment.getMember().getMemberId());
        boardService.verifyExistsBoard(comment.getBoard().getBoardId());
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        verifyExistsComment(comment.getCommentId());

        Optional<Comment> commentOptional = commentRepository.findById(comment.getCommentId());
        if (commentOptional.isPresent()) {
            Comment comment1 = commentOptional.get();
            comment1.setContent(comment.getContent());
            return commentRepository.save(comment1);
        }

        return commentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public List<Comment> findComments(Long boardId) {
        boardService.verifyExistsBoard(boardId);

        return commentRepository.findAllByBoard_BoardId(boardId);
    }

    public void deleteComment(Long commentId) {
        verifyExistsComment(commentId);

        commentRepository.deleteById(commentId);
    }

    public void verifyExistsComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}

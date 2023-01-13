package mainproject.stocksite.domain.comment.service;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.comment.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;


    public Comment CreateComment (Comment comment) {

        return commentRepository.save(comment);
    }

    public Comment UpdateComment (Comment comment) {

        Optional<Comment> commentOptional = commentRepository.findById(comment.getCommentId());
        if (commentOptional.isPresent()) {
            Comment comment1 = commentOptional.get();
            comment1.setContent(comment.getContent());
            return commentRepository.save(comment1);
        }
        return commentRepository.save(comment);
    }

    public void deleteComment (Long commentId){
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }



    private Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new NoSuchElementException("코멘트 없음"));
        return findComment;
    }
}

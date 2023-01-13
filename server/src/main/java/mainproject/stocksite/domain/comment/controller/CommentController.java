package mainproject.stocksite.domain.comment.controller;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.board.dto.BoardPostDto;
import mainproject.stocksite.domain.board.dto.BoardResponseDto;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.comment.dto.CommentPatchDto;
import mainproject.stocksite.domain.comment.dto.CommentPostDto;
import mainproject.stocksite.domain.comment.dto.CommentResponseDto;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.comment.service.CommentService;
import mainproject.stocksite.domain.comment.mapper.CommentMapper;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{member-id}")
    public CommentResponseDto post(@PathVariable("member-id") Long memberId, @Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto, memberId);
        Comment addComment = commentService.CreateComment(comment);
        CommentResponseDto commentResponseDto = commentMapper.commentToResponseDto(addComment);

        return commentResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{comment-id}")
    public CommentResponseDto patchOne(@PathVariable("comment-id") Long commentId, @Valid @RequestBody CommentPatchDto commentPatchDto) {
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setCommentId(commentId);
        Comment updateComment = commentService.UpdateComment(comment);
        CommentResponseDto commentResponseDto = commentMapper.commentToResponseDto(updateComment);

        return commentResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{comment-id}")
    public void deleteOne(@PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId);
    }

}

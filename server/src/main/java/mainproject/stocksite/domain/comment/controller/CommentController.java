package mainproject.stocksite.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.comment.dto.CommentPatchDto;
import mainproject.stocksite.domain.comment.dto.CommentPostDto;
import mainproject.stocksite.domain.comment.dto.CommentResponseDto;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.comment.mapper.CommentMapper;
import mainproject.stocksite.domain.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CommentPostDto.ResponseDto post(@Valid @RequestBody CommentPostDto commentPostDto) {

        Comment comment = commentMapper.commentPostDtoToComment(commentPostDto);
        Comment addComment = commentService.createComment(comment);
        CommentPostDto.ResponseDto commentResponseDto = commentMapper.commentToCommentPostResponseDto(addComment);

        return commentResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{comment-id}")
    public CommentResponseDto patchOne(@PathVariable("comment-id") @Positive Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {

        commentPatchDto.setCommentId(commentId);
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        Comment updateComment = commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = commentMapper.commentToResponseDto(updateComment);

        return commentResponseDto;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam("board") @Positive Long boardId) {
        List<Comment> comments = commentService.findComments(boardId);
        List<CommentResponseDto> response = commentMapper.commentToCommentResponseDtos(comments);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{comment-id}")
    public void deleteOne(@PathVariable("comment-id") @Positive Long commentId) {
        commentService.deleteComment(commentId);
    }
}

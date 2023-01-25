package mainproject.stocksite.domain.board.contorller;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.board.dto.BoardPatchDto;
import mainproject.stocksite.domain.board.dto.BoardPostDto;
import mainproject.stocksite.domain.board.dto.BoardResponseDto;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.board.mapper.BoardMapper;
import mainproject.stocksite.domain.board.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@Validated
public class BoardController {

    private final BoardService service;

    private final BoardMapper mapper;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BoardPostDto.ResponseDto post(@Valid @RequestBody BoardPostDto boardPostDto) {
        Board board = mapper.boardPostDtoToEntity(boardPostDto);
        Board addBoard = service.addBoard(board);
        BoardPostDto.ResponseDto boardResponseDto = mapper.boardToBoardPostResponseDto(addBoard);

        return boardResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{board-id}")
    public BoardResponseDto patchOne(@PathVariable("board-id") @Positive Long boardId,
                                     @Valid @RequestBody BoardPatchDto boardPatchDto) {

        boardPatchDto.setBoardId(boardId);
        Board board = mapper.boardPatchDtoToEntity(boardPatchDto);
        Board updateBoard = service.updateBoard(board);
        BoardResponseDto boardResponseDto = mapper.boardToResponseDto(updateBoard);

        return boardResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{board-id}")
    public BoardResponseDto getOne(@PathVariable("board-id") @Positive Long boardId) {
        return mapper.boardToResponseDto(service.getBoard(boardId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<BoardResponseDto> getAll() {
        return mapper.boardListToResponseDto(service.getBoardList());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{board-id}")
    public void deleteOne(@PathVariable("board-id") @Positive Long boardId) {
        service.deleteBoard(boardId);
    }
}

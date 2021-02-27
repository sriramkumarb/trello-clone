import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from '../../services'
import { TaskService } from '../../services'
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  boards = [];
  tasks = [];

  constructor(private boardService: BoardService,
    private taskService: TaskService) {
    this.boardService.getBoards().subscribe((res: any) => {
      this.boards = this.boards.concat(res)

      for (var i = 0; i < this.boards.length; i++) {

        var x = this.boards[i]._id

        if (x != null) {

          this.taskService.getTasks(x).subscribe((res: any) => {
            this.tasks = this.tasks.concat(res)
          })

        }
      }
    })
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}

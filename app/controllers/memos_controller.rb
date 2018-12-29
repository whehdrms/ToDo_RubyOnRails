class MemosController < ApplicationController
  def index
    sort = case params[:sort]
           when "due"  then "due"
           when "priority"   then "priority DESC"
           else
            "id"
           end
           
    @memos = Memo.where(completed: false).order(sort)
    @notifications = []
    for m in @memos.where.not(due: nil)
      if (m.due - Time.now) < 0
        @notifications.push(m);
      end
    end
  end
  
  def index_completed
    @memos = Memo.where(completed: true)
  end

  def create
    @memo = Memo.new(title: params[:memo_title], content: params[:memo_content])
    
    # due check
    if params[:due_checked] == "true"
      if !params[:memo_due_date].blank?
        @memo.due = Time.parse((params[:memo_due_date]+" "+params[:memo_due_time]))
      end
    end
    
    # priroty check
    if !params[:memo_priority].blank?
      @memo.priority = params[:memo_priority]
    end
    
    if @memo.save
      redirect_to memos_path
    else
      redirect_to :back
    end
  end

  def update
    @memo = Memo.find(params[:id])
    @memo.title = params[:memo_title]
    @memo.content = params[:memo_content]
    
    # due check
    if params[:due_checked] == "true"
      if !params[:memo_due_date].blank?
        @memo.due = Time.parse((params[:memo_due_date]+" "+params[:memo_due_time]))
      end
    else
      @memo.due = nil
    end
    
    # priroty check
    if !params[:memo_priority].blank?
      @memo.priority = params[:memo_priority]
    end
    
    if @memo.save
      redirect_to memos_path
    else
      redirect_to :back
    end
  end

  def destroy
    @memo = Memo.find(params[:id])
    @memo.destroy
    redirect_to memos_path
  end
  
  def completedToggle
    memo = Memo.find(params[:id])

    if memo.completed == false
      memo.completed = true
    else
      memo.completed = false
    end
    
    memo.save
  end
end

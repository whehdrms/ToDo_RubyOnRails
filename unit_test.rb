require 'minitest/autorun'

class MemosController < Minitest::Test
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
end
 
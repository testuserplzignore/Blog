require 'test_helper'

class UserCommentsControllerTest < ActionDispatch::IntegrationTest
  test "should get users" do
    get user_comments_users_url
    assert_response :success
  end

  test "should get comments" do
    get user_comments_comments_url
    assert_response :success
  end

  test "should get posts" do
    get user_comments_posts_url
    assert_response :success
  end

end

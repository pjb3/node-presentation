require 'socket' 

server = TCPServer.new('localhost', 4242)
puts "Sleeper listening on port 4242"
while (session = server.accept)
  Thread.new do
    session << "How long should I sleep for?\n"
    session.gets.to_i.downto(1) do |n|
      $stdout << "\rSleeping #{n} "
      $stdout.flush
      sleep 1
    end
    puts "\r"
    session << "Done\n"
    session.close
  end
end
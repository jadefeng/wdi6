# Make this code work:

# n = Roman.new(13)
# puts n
# # => 'XIII'
# Bonus

# Create a Sinatra application which allows the browser to send a number to the server via AJAX and displays the Roman numeral it receives back. 

require 'pry'

numbers = {
	1000 => 'M',
	500 => 'D',
	100 => 'C',
	50 => 'L',
	10 => 'X',
	5 => 'V',
	1 => 'I'
}

puts "What number would you like to test?"
number_answer = gets.chomp.to_i
number = number_answer
answer = []

	until (number == 0)
		if (number >= 1000)
			answer << "M"
			number -= 1000
		elsif (number >= 900)
			answer << "CM"
			number -= 900
		elsif (number >= 600)
			answer << "C"
			number -= 100
		elsif (number >= 500)
			answer << "D"
			number -= 500
		elsif (number >= 400)
			answer << "CD"
			number -= 400
		elsif (number >= 100)
			answer << "C"
			number -= 100
		elsif (number >= 90)
			answer << "XC"
			number -= 90
		elsif (number >= 60)
			answer << "X"
			number -= 10
		elsif (number >= 50)
			answer << "L"
			number -= 50
		elsif (number >= 40)
			answer << "XL"
			number -= 40
		elsif (number >= 10)
			answer << "X"
			number -= 10
		elsif (number >= 9)
			answer << "IX"
			number -= 9
		elsif (number >= 6)
			answer << "I"
			number -= 1
		elsif (number >= 5)
			answer << "V"
			number -= 5
		elsif (number >= 4)
			answer << "IV"
			number -= 4
		elsif (number >= 1)
			answer << "I"
			number -= 1
		end
	end


puts "The #{ number_answer.to_s } converted to Roman Numerals is #{ answer.join("") }"

# binding.pry

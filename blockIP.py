# # Import the win32com.client module, which provides access to Windows API functions
# import win32com.client


# # Define a function to block a specific IP address
# def block_ip(ip_address):
#     # Create a new instance of the Windows Firewall Manager
#     firewall = win32com.client.Dispatch("HNetCfg.FwMgr")
#     # Get the current firewall policy for the active profile
#     policy = firewall.LocalPolicy.CurrentProfile
#     # Get a collection of existing firewall rules
#     rules = policy.Rules

#     # Create a new firewall rule
#     new_rule = win32com.client.Dispatch("HNetCfg.FwRule")
#     # Set the name of the rule
#     new_rule.Name = "Block IP"
#     # Set the action to "Block" (prevents incoming traffic)
#     new_rule.Action = 2  # 2 means "Block"
#     # Set the direction to "Inbound" (incoming traffic)
#     new_rule.Direction = 1  # 1 means "Inbound"
#     # Enable the rule
#     new_rule.Enabled = True
#     # Specify the remote IP address to block
#     new_rule.RemoteAddresses = ip_address

#     # Add the new rule to the collection of rules
#     rules.Add(new_rule)


# block_ip("192.168.241.200")


import ctypes

# Define constants
NET_FW_PROFILE2_PRIVATE = 2
NET_FW_ACTION_BLOCK = 0

# Create a COM object for the Windows Firewall
firewall = ctypes.windll.hnetcfg.HNetCfgMgr()

# Get the LocalPolicy object for the active profile
policy = firewall.LocalPolicy.GetProfileByType(NET_FW_PROFILE2_PRIVATE)

# Create a new inbound firewall rule to block the IP
new_rule = policy.Rules.Add(ctypes.c_long(NET_FW_ACTION_BLOCK))
new_rule.Name = "Block IP"
new_rule.RemoteAddresses = "192.168.241.200"
new_rule.Enabled = True

# Apply the new rule
new_rule.Action = NET_FW_ACTION_BLOCK

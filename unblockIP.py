# Import the win32com.client module, which provides access to Windows API functions
import win32com.client


def unblock_ip(ip_address):
    firewall = win32com.client.Dispatch("HNetCfg.FwMgr")
    policy = firewall.LocalPolicy.CurrentProfile
    rules = policy.Rules

    for rule in rules:
        if rule.Name == "Block IP" and rule.RemoteAddresses == ip_address:
            rules.Remove(rule.Name)
            break


unblock_ip("192.168.241.200")  # Unblock IP address
